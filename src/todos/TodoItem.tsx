import clsx from 'clsx';
import { PaperclipIcon, RefreshCwIcon, SquareCheckIcon, SquareIcon, Trash2Icon, XIcon } from 'lucide-react';

import api from '../api';
import { Meta, Todo } from '../types';
import { ChangeEventHandler, MouseEvent } from 'react';
import { toast } from 'sonner';

interface TodoItemProps {
  id: number;
  todo: Todo;
  meta: Meta;
}

export default function TodoItem({ todo, meta }: TodoItemProps) {
  const [setChecked, setCheckedResult] = api.useSetTodoCompleteMutation();
  const [deleteTodo, deleteTodoResult] = api.useDeleteTodoMutation();
  const [uploadFile, uploadFileResult] = api.useUploadFileMutation();
  const [deleteFile, deleteFileResult] = api.useDeleteFileMutation();

  const onFileSelect: ChangeEventHandler<HTMLInputElement> = async (event): Promise<void> => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length) {
      const file = target.files[0];

      const payload = {
        id: todo.id,
        file,
      };

      try {
        const promise = uploadFile(payload).unwrap();

        toast.promise(promise, {
          loading: 'File upload is in progress...',
          success: `File upload is successful`,
          error: 'Failed to upload file',
        });

        await promise;
      } catch (err) {}
    }
  };

  const handleDelete = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    const yes = confirm('Are you sure?');
    if (!yes) {
      return;
    }
    try {
      await deleteTodo(todo.id).unwrap();
      toast.success('Todod deleted sucessfully');
    } catch {
      toast.error('Failed to delete todo. Try again.');
    }
  };

  const handleDeleteAttachment = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    const yes = confirm('Are you sure to remove the attachment?');
    if (!yes) {
      return;
    }
    try {
      await deleteFile(todo.id).unwrap();
      toast.success('Attachment deleted sucessfully');
    } catch {
      toast.error('Failed to delete attachment. Try again.');
    }
  };

  return (
    <div
      className={clsx('group flex flex-1 rounded-md p-2 px-4 hover:bg-[rgba(214,214,214,0.15)]', {
        'pointer-events-none bg-gray-800': setCheckedResult.isLoading,
      })}
    >
      <div className="flex flex-1 items-center">
        <button
          className="-mt-1"
          onClick={async () => {
            setChecked({ id: todo.id, checked: !todo.is_completed });
          }}
          disabled={setCheckedResult.isLoading}
        >
          {todo.is_completed ? <SquareCheckIcon size={24} /> : <SquareIcon size={20} />}
        </button>
        <div className="ml-2 flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <div className="max-w-64">
              <p
                className={clsx('truncate text-sm', {
                  'line-through': todo.is_completed,
                })}
              >
                {todo.title}
              </p>
            </div>
            {todo.attachment_url !== null && (
              <div>
                <a
                  className={clsx(
                    'inline-flex items-center gap-0.5 rounded-full bg-[#d9d9d9] px-2 py-px text-[10px] font-medium text-black',
                    {
                      'pointer-events-none': deleteFileResult.isLoading,
                    },
                  )}
                  href={todo.attachment_url}
                  target="_blank"
                  download
                >
                  <PaperclipIcon size="1em" />{' '}
                  <span className="max-w-20 truncate text-[9px]">
                    {decodeURIComponent(todo.attachment_url.split('/').pop() ?? 'Attachment')}
                  </span>
                  <XIcon size={'1em'} className="ml-1" onClick={(e) => void handleDeleteAttachment(e)} />
                </a>
              </div>
            )}
          </div>
          <p
            className={clsx('max-w-96 truncate text-xs text-[#909090]', {
              'line-through': todo.is_completed,
            })}
          >
            {todo.description}
          </p>
        </div>

        <div className={clsx('invisible flex gap-2 group-hover:visible', { '!visible': deleteTodoResult.isLoading })}>
          {meta.attachment_supported && (
            <button className="relative cursor-pointer text-slate-200">
              {uploadFileResult.isLoading && <RefreshCwIcon size={16} className="origin-center animate-spin" />}

              {!uploadFileResult.isLoading && (
                <>
                  <PaperclipIcon size={16} />
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0"
                    id="attachment"
                    onChange={onFileSelect}
                    accept="image/*"
                  />
                </>
              )}
            </button>
          )}
          <button className="text-white" disabled={deleteTodoResult.isLoading} onClick={handleDelete}>
            <Trash2Icon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
