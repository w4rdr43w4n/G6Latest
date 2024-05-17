"use client";
import React, { FC, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
// import "./custom-quill.css";
import { Sapling } from "@saplingai/sapling-js/observer";
import { useEffect } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import ReactDOM from "react-dom/client";
import Search from "@/components/editor/Search-tools";
import { DoubleArrowUpIcon } from "@radix-ui/react-icons";
import { GearIcon, Share2Icon, LightningBoltIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import katex from "katex";
import { plagiarism } from "@/app/api/search_utils/literature_utils";
import { Button } from "../ui/button";
import { Button1 } from "../ui/upg-btn";

import ToastNotification from "./ToastNotification";
import ContextMenu from "./contextmenu";
import LiteraturePopup from "../Search/literature_popup";
import ReferencePopup from "../Search/ReferencePopup";

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};
export const Editor = () => {
  const handleViewLiterature = () => {
    setCustomLR(true);
  };
  const handleViewRef = () => {
    setCustomRef(true);
  };
  const [type, setType] = useState("lr");
  const [projectName, setProjectName] = useState("")
  const [value, setValue] = React.useState("");
  const [number, setNumber] = React.useState(0);
  const [customLR, setCustomLR] = useState<boolean>(false);
  const [customRef, setCustomRef] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const [hasImportRef, setHasImportRef] = useState<boolean>(false)
  const [reflst, setReflst] = useState("");
  const [popup, setShowPopup] = useState<boolean>(false);


  const handleChange = (value: string) => {
    setValue(value);
  };
  const quillRef = React.useRef<any>();

  useEffect(() => {
    Sapling.init({
      key: "2J7D6F5JDX3HBH5UJB3CS0UA9W0HZORO",
      endpointHostname: "https://api.sapling.ai",
      editPathname: "/api/v1/edits",
      advancedEdits: {
        advance_edits: true,
      },

      statusBadge: true,
      mode: "dev",
    });

    // Ensure the Quill instance is initialized before observing
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();

      // console.log('editor :',quillInstance);
      const contentEditable = quillInstance.root;
      //  console.log(contentEditable);
      Sapling.observe(contentEditable);
    }
  });

  const PlagiarismChecker: FC = () => {
    const [toastVisible, setToastVisible] = useState(false);
    const [output, setOutput] = useState("");
    const [checking, setCheckingState] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState("Plagiarism Check");

    const handleCheckButton = () => {
      setCheckingState(true);
    };
    const showToast = () => {
      setToastVisible(true);
    };

    const closeToast = () => {
      setToastVisible(false);
    };

    useEffect(() => {
      try {
        const quill = quillRef.current.getEditor();
        const length = quill.getLength();
        const text = quill.getText(0, length);
        if (checking) {
          if (text.length === 1) {
            setOutput("Enter some text please");
          } else {
            setButtonText("checking..");
            const button: any = document.querySelector(
              ".plg-check-button-editor"
            );
            button.disabled = true;
            const plgFetch = async () => {
              const response = await plagiarism(text);
              setOutput(response?.data.message);
              setToastVisible(true);
              setButtonText("Plagiarism Check");
              button.disabled = false;
            };
            plgFetch();
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          setOutput(error.message);
        } else {
          setOutput("An unknown error occurred");
        }
      } finally {
        setCheckingState(false);
      }
      PlagiarismChecker;
    }, [checking, output]);
    return (
      <div className="plag">
        <ToastNotification visible={toastVisible} onClose={closeToast} />
        <Button
          className="plg-check-button-editor h-16  w-fit"
          variant="outline"
          onClick={handleCheckButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#52525b"
            className="bi bi-shield-check"
            viewBox="0 0 16 16"
          >
            <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
            <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
          </svg>
          <span className="ml-2">{buttonText} </span>
        </Button>
        {/* <button onClick={showToast}>submit</button> */}
        {/* <p>{output}</p> */}
      </div>
    );
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      // Function to render React components into placeholders
      const renderReactComponents = () => {
        const placeholders: any = document.querySelectorAll(
          ".react-component-placeholder"
        );
        placeholders.forEach((placeholder: any) => {
          // Check if the placeholder has already been rendered
          //  if (!placeholder.dataset.rendered) {
          // Render the React component into the placeholder
          ReactDOM.createRoot(placeholder).render(<EditableMathField />);

          // Mark the placeholder as rendered
          // placeholder.dataset.rendered = 'true';
          //}
        });
      };

      // Use a MutationObserver to watch for changes in the Quill editor's content
      const observer = new MutationObserver(renderReactComponents);
      const editorContainer = quill.root.parentNode; // Assuming the Quill editor is directly inside the container
      observer.observe(editorContainer, { childList: true, subtree: true });

      // Cleanup function to disconnect the observer when the component unmounts
      return () => observer.disconnect();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setValue(value);
    }
  };

  const handleEditorChange = (value: string) => {
    setValue(value);
    const quill = quillRef.current.getEditor();
    const length = quill.getLength();
    setNumber(length - 1);
  };

  // Handler to handle button clicked
  const handler = () => {
    console.log(value);
  };
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    const contextDiv = document.getElementById("context");
    if (contextDiv) {
      const rect = contextDiv.getBoundingClientRect();
      const x = pageX - rect.left;
      const y = pageY - rect.top;
      setContextMenu({ show: true, x, y });
    }
  };
  const handleHideContextMenu = () => {
    setContextMenu(initialContextMenu);
  };

  return (
    <div className="Editor relative mx-auto">
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={handleHideContextMenu}
        />
      )}
      {/* <ModeToggle /> */}
      <div className=" flex justify-between flex-row pe-2 ps-4 h-14 bg-white">
        <span className="font-bold flex flex-col justify-center ">
          Untitteled
        </span>
        <div className="btn-div-editor">
          <Button1 variant="outline" className="upg-btn ml-2 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-share-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
            </svg>
            <span className="ml-2">Share</span>
          </Button1>
          <Button1 variant="outline" className="upg-btn ml-2 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lightning-charge-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
            </svg>
            <span className="ml-2">Upgrade</span>
          </Button1>
          <Sheet>
            <SheetTrigger className="ml-2 mr-2">
              <GearIcon className="w-6 h-6 " style={{ color: "#52525b" }} />
            </SheetTrigger>
            <SheetContent
              className="options-sheet"
              onInteractOutside={(event) => event.preventDefault()}
            >
              <SheetHeader>
                <SheetTitle
                  style={{
                    color: "#171717",
                    fontWeight: "normal",
                    marginLeft: "24px",
                  }}
                >
                  {" "}
                  &gt;&gt; &nbsp; &nbsp; Document Settings
                </SheetTitle>
                <SheetDescription>
                  <Search />
                  
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <button className="view-custom-lr-btn" onClick={handleViewLiterature}>
            CLR
          </button>
          <button className="view-custom-lr-btn" onClick={handleViewRef}>
          CRL
        </button>
        </div>
      </div>
      <EditorToolbar />
      <div id="context" onContextMenu={handleContextMenu}>
        <ReactQuill
          value={value}
          onChange={handleEditorChange}
          modules={modules}
          onKeyDown={handleKeyDown}
          formats={formats}
          ref={quillRef}
        />
      </div>

      <div className="flex justify-between  center-div">
        <div className="ml-3 text-base flext content-center ">
          {number} character
        </div>
        <PlagiarismChecker />
      </div>
      {customLR && <LiteraturePopup onExit={setCustomLR} />}
      {customRef && (
          <ReferencePopup
          projectName={projectName}
          hasImported={hasImportRef}
          setHasImported={setHasImportRef}
            value={reflst}
            setOutput={setReflst}
            importType={setType}
            isImport={setShowPopup}
            onExit={setCustomRef}
          />
        )}
    </div>
  );
};

export default Editor;
