import { PlusIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import api from '../api';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  title: z.string({ required_error: 'Title is required' }).max(15, 'Title cannot be more than 15 characters'),
  description: z
    .string({ required_error: 'Description is required' })
    .max(30, 'Description cannot be more than 30 characters'),
});

type NewTaskForm = z.infer<typeof schema>;

export default function NewTodo() {
  const [addTodo, addTodoResult] = api.useAddTodoMutation();
  const { register, handleSubmit, reset } = useForm<NewTaskForm>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleFormSubmit: SubmitHandler<NewTaskForm> = async (data) => {
    try {
      await addTodo(data).unwrap();
      toast.success('Todo added sucessfully');
      reset();
    } catch {
      toast.error('Failed to add todo. Try again.');
    }
  };

  return (
    <form className="mt-2 flex w-full gap-2 rounded px-4 text-sm font-medium" onSubmit={handleSubmit(handleFormSubmit)}>
      <PlusIcon className="mt-2 text-gray-400" size={20} />
      <div className="flex flex-1 flex-col gap-4">
        <input
          className="h-8 flex-grow border-b border-dotted bg-transparent font-medium focus:outline-none"
          type="text"
          placeholder="add a new task"
          required
          minLength={3}
          maxLength={15}
          {...register('title')}
          disabled={addTodoResult.isLoading}
        />
        <input
          className="h-8 flex-grow border-b border-dotted bg-transparent font-medium focus:outline-none"
          type="text"
          placeholder="Write a descirption"
          required
          minLength={3}
          maxLength={30}
          {...register('description')}
          disabled={addTodoResult.isLoading}
        />
        <div>
          <button
            className="mt-2 rounded-full border border-white/50 px-4 py-0.5 hover:bg-white/10"
            disabled={addTodoResult.isLoading}
          >
            {addTodoResult.isLoading ? 'Adding Todo' : 'Add Todo'}
          </button>
        </div>
      </div>
    </form>
  );
}
