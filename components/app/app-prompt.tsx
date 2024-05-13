import cn from "classnames";
import type { FC, ReactNode, SyntheticEvent } from "react";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog as HUIDialog, Transition } from "@headlessui/react@1.7.8";

const API_URL = "/api/motif/v1/integrations/gptsearch/completions";
const I_DONT_KNOW = "Sorry, I am not sure how to answer that.";

const ChatIcon = ({ className }: { className?: string }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
);

type DialogProps = {
  isOpen: Boolean;
  onClose: () => void;
  children: ReactNode;
};

const Dialog: FC<DialogProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <HUIDialog open={isOpen} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="z-50 fixed inset-0 bg-black/20 backdrop-blur-md" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="z-50 fixed inset-y-0 inset-0 flex items-center justify-center">
            <HUIDialog.Panel className="relative w-full bg-white dark:bg-neutral-900 rounded-lg max-w-screen-sm">
              {children}
            </HUIDialog.Panel>
          </div>
        </Transition.Child>
      </HUIDialog>
    </Transition>
  );
};

const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <span className="loading-dots">
      <span className={className} />
      <span className={className} />
      <span className={className} />
    </span>
  );
};

type AnswerProps = {
  answer: string;
  onLinkClick: () => void;
};

const Answer: FC<AnswerProps> = ({ answer, onLinkClick }) => {
  const [plugins, setPlugins] = useState<any>([]);
  const [ReactMarkdownComp, setReactMarkdownComp] = useState<any>(undefined);

  useEffect(() => {
    import("https://esm.sh/remark-gfm@3.0.1")
      .then((mod) => mod.default)
      .then((gfm) => {
        setPlugins([gfm]);
      });
  }, []);

  useEffect(() => {
    if (!plugins) {
      return;
    }
    import("https://esm.sh/react-markdown@8.0.5")
      .then((mod) => mod.default)
      .then((RM) => {
        setReactMarkdownComp(
          <RM
            remarkPlugins={plugins}
            components={{
              a: (props: any) => {
                return <a {...props} onClick={onLinkClick} />;
              },
            }}
          >
            {answer}
          </RM>
        );
      });
  }, [answer, plugins]);

  return (
    <div className="flex flex-col gap-4">
      <div className="prose dark:prose-invert">{ReactMarkdownComp}</div>
    </div>
  );
};

type PathMeta = {
  path: string;
  meta?: { title: string } & { [key: string]: any };
};

type ReferenceInfo = {
  path: string;
  title: string;
};

type IdPathMetaMap = { [key: string]: PathMeta };

type ReferencesProps = {
  references: string[];
  idPathMetaMap: IdPathMetaMap;
  onLinkClick: () => void;
};

const References: FC<ReferencesProps> = ({
  references,
  idPathMetaMap,
  onLinkClick,
}) => {
  const referenceInfo = useMemo(() => {
    return (references || [])
      .slice(0, 5)
      .map((id) => {
        const pathMeta = idPathMetaMap?.[id];
        if (!pathMeta) {
          return undefined;
        }
        const title = pathMeta.meta?.title || "Untitled";
        const path = pathMeta.path ?? "/";
        return { path, title };
      })
      .filter(Boolean) as ReferenceInfo[];
  }, [references, idPathMetaMap]);

  return (
    <>
      {referenceInfo.length > 0 && (
        <div>
          <p className="font-medium mb-1">References</p>
          {referenceInfo.map(({ path, title }) => {
            return (
              <a
                className="block subtleUnderline text-sm text-neutral-500 dark:text-white/50"
                href={path}
                onClick={onLinkClick}
              >
                {title}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
};

type DialogContentProps = {
  idPathMetaMap: IdPathMetaMap;
  onLinkClick: () => void;
  placeholder?: string;
  iDontKnowMessage?: string;
};

const DialogContent: FC<DialogContentProps> = ({
  idPathMetaMap,
  onLinkClick,
  placeholder,
  iDontKnowMessage: _iDontKnowMessage,
}) => {
  const [prompt, setPrompt] = useState<string | undefined>(undefined);
  const [answer, setAnswer] = useState("");
  const [references, setReferences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const answerContainerRef = useRef<HTMLDivElement>(null);
  const iDontKnowMessage = _iDontKnowMessage || I_DONT_KNOW;

  const submitPrompt = useCallback(
    async (e: SyntheticEvent<EventTarget>) => {
      e.preventDefault();

      if (!prompt) {
        return;
      }

      setAnswer("");
      setReferences([]);
      setLoading(true);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, iDontKnowMessage }),
        });

        if (!res.ok || !res.body) {
          // Don't show the verbatim error message to users, but print
          // it in the console.
          console.warn(await res.text());
          setAnswer(iDontKnowMessage);
          setLoading(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let startText = "";
        let didHandleHeader = false;
        let __references = [];

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          if (!didHandleHeader) {
            startText = startText + chunkValue;
            if (startText.includes("___MOTIF_START_STREAM___")) {
              const parts = startText.split("___MOTIF_START_STREAM___");
              try {
                __references = JSON.parse(parts[0]);
              } catch {}
              setAnswer((prev) => prev + parts[1].replace(/\\/gi, ""));
              didHandleHeader = true;
            }
          } else {
            setAnswer((prev) => prev + chunkValue.replace(/\\/gi, ""));
          }
        }
        setReferences(__references);
      } catch (e) {
        console.warn("Error", e);
        setAnswer(iDontKnowMessage);
      }
      setLoading(false);
    },
    [prompt]
  );

  useEffect(() => {
    answerContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answer]);

  return (
    <div className="absolute px-5 py-4 flex flex-col inset-0">
      <div className="flex-none w-full">
        <form onSubmit={submitPrompt}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              {loading ? (
                <LoadingDots className="bg-neutral-500 dark:bg-white/50" />
              ) : (
                <ChatIcon className="w-5 h-5 text-neutral-500 dark:text-white/30" />
              )}
            </div>
            <input
              value={prompt || ""}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={placeholder || "Ask a question..."}
              className="w-full block py-2 pl-11 pr-16 text-sm text-neutral-900 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/50 focus:outline-none sm:text-sm transition bg-transparent"
              type="text"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <div className="text-xs text-neutral-400 dark:text-white/20 border border-neutral-200 dark:border-white/10 rounded px-2 bg-neutral-50 dark:bg-white/10">
                Esc
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-grow mt-2 py-6 h-full overflow-y-auto border-t border-neutral-100 dark:border-white/5">
        <Answer answer={answer} onLinkClick={onLinkClick} />
        <div
          className={cn("mt-8 transition duration-500", {
            "opacity-0": !references || references?.length === 0,
          })}
        >
          <References
            references={references}
            idPathMetaMap={idPathMetaMap}
            onLinkClick={onLinkClick}
          />
        </div>
        <div className="h-24 w-full" />
        <div ref={answerContainerRef} />
      </div>
      <p className="pt-4 pb-1 border-t border-neutral-100 dark:border-white/10 text-xs text-neutral-400 dark:text-white/20">
        Powered by{" "}
        <a
          className="underline"
          href="https://motif.land"
          target="_blank"
          rel="noreferrer"
        >
          Motif
        </a>{" "}
        and{" "}
        <a
          className="underline"
          href="https://openai.com"
          target="_blank"
          rel="noreferrer"
        >
          OpenAI
        </a>
      </p>
    </div>
  );
};

type FileTree = {
  files: FileTree[];
  folders: FileTree[];
  id: string;
  path: string;
  name: string;
  meta: { [key: string]: any };
};

const toIdPathMetaMap = (tree: any) => {
  let saveMap: any = {};

  const updateMap = (tree: FileTree) => {
    for (const file of tree.files) {
      const name = file.name.split(".").slice(0, -1).join(".");
      saveMap[file.id] =
        { path: file.path, name, meta: { title: name, ...file.meta } } || {};
    }
    for (const folder of tree.folders) {
      updateMap(folder);
    }
  };

  updateMap(tree);

  return saveMap;
};

type PromptProps = {
  files: FileTree;
  placeholder?: string;
  iDontKnowMessage?: string;
  Icon?: ReactNode;
};

export const Prompt: FC<PromptProps> = ({
  files,
  placeholder,
  iDontKnowMessage,
  Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const idPathMetaMap = useMemo(() => {
    return files ? toIdPathMetaMap(files) : {};
  }, [files]);

  useEffect(() => {
    const onKeyDown = (event: any) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={cn("w-min group transition rounded-md cursor-pointer", {
          "p-2 hover:opacity-90 hover:bg-black/5 dark:hover:bg-white/5": !Icon,
        })}
      >
        {Icon ?? (
          <ChatIcon className="w-5 h-5 text-neutral-900 dark:text-white/50 transition" />
        )}
      </div>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="max-w-screen-sm mx-auto h-[calc(100vh-120px)] max-h-[720px] overflow-hidden">
          <DialogContent
            idPathMetaMap={idPathMetaMap}
            onLinkClick={() => setIsOpen(false)}
            placeholder={placeholder}
            iDontKnowMessage={iDontKnowMessage}
          />
        </div>
      </Dialog>
    </>
  );
};
