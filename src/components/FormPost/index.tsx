import { useState } from 'react';
import { Post } from '../../../types/types';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
import * as Styled from './styles';

export type FormPostProps = {
  onSave?: (post: Post) => Promise<void>;
  post?: Post;
  errorMessage?: string;
};

export const FormPost = ({ post, onSave, errorMessage }: FormPostProps) => {
  const id = post?.id ?? '';
  const title = post?.attributes?.title ?? '';
  const auth_text = post?.attributes?.auth_text ?? '';

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(auth_text);
  const [saving, setSaving] = useState(false);

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (saving) return;
    if (onSave) {
      await onSave({
        id,
        attributes: {
          title: newTitle,
          auth_text: newContent,
        },
      });
    }
    setSaving(false);
  };

  return (
    <form onSubmit={HandleSubmit}>
      <TextInput
        name="post-title"
        label="Post Title"
        value={newTitle}
        onInputChange={(e) => setNewTitle(e)}
      />
      <TextInput
        name="post-title"
        label="Post Content"
        value={newContent}
        onInputChange={(e) => setNewContent(e)}
        as="textarea"
      />
      {errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}
      <Button disabled={saving} type="submit">
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};
