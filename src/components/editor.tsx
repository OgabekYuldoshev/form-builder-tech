import { Box, Input } from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useEffect } from "react";

const DISABLED_OPACITY = 0.7;

export interface EditorProps {
  /** Kontent (HTML string) */
  value?: string;
  /** Kontent o'zgarganda chaqiriladi */
  onChange?: (value: string) => void;
  /** Formda disabled holatda ko'rsatish */
  disabled?: boolean;
  /** Label matni */
  label?: React.ReactNode;
  /** Label ostidagi tavsif */
  description?: React.ReactNode;
  /** Xato xabari (form validatsiyasi uchun) */
  error?: React.ReactNode;
  /** Majburiy maydon belgisi */
  required?: boolean;
  /** Input id (label bilan bog'lash uchun) */
  id?: string;
  /** Placeholder (bo'sh bo'lganda ko'rinadi) */
  placeholder?: string;
  /** Toolbar ni yashirish (faqat kontent, masalan readonly ko'rinishda) */
  hideToolbar?: boolean;
  /** Qo'shimcha class */
  className?: string;
}

export function Editor({
  value = "",
  onChange,
  disabled = false,
  label,
  description,
  error,
  required,
  id,
  placeholder: _placeholder = "Yozing...",
  hideToolbar = false,
  className,
}: EditorProps) {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    editable: !disabled,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  if (!editor) return null;

  return (
    <Input.Wrapper
      id={id}
      label={label}
      description={description}
      error={error}
      required={required}
      size="sm"
      className={className}
      inputContainer={(children) => (
        <Box style={{ opacity: disabled ? DISABLED_OPACITY : 1 }}>{children}</Box>
      )}
    >
      <RichTextEditor
        editor={editor}
        style={{ pointerEvents: disabled ? "none" : undefined }}
      >
        {!hideToolbar && (
          <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
        )}

        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
}
