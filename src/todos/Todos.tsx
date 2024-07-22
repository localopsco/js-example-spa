import TodoItem from './TodoItem';
import NewTodo from './NewTodo';

import api from '../api';
import clsx from 'clsx';
import getMetaData from './metadata';

function Todos() {
  const { data: meta } = api.useMetaQuery();
  const { data: todos } = api.useTodosQuery();

  if (typeof todos === 'undefined' || typeof meta === 'undefined') {
    return 'Fetching data';
  }

  const metadata = getMetaData(meta);
  const Logo = metadata.logo;

  return (
    <div
      className={clsx('items-cente flex min-h-dvh flex-col', {
        'bg-[#011D0C]': metadata.framewrok === 'node',
        'bg-[#011F1D]': metadata.framewrok === 'django',
        'bg-[#230000]': metadata.framewrok === 'rails',
        'bg-[#001D24]': metadata.framewrok === 'go',
      })}
    >
      <div className="flex h-full flex-1 flex-col items-center justify-center text-white">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium">
            {metadata.frameworkName} Todo App - Version {metadata.appVersion}
          </h1>
          <p className="mt-1 text-sm">Tech stack: {metadata.stack}</p>
          {metadata.cloudDependencies && (
            <p className="mt-4 text-sm">Cloud dependencies: {metadata.cloudDependencies}</p>
          )}
        </div>
        <div className={clsx('w-160 max-w-xl rounded-2xl bg-[rgba(255,255,255,0.10)] p-10 text-gray-200 shadow-lg')}>
          <div className="flex flex-col gap-1">
            {todos.map((todo, index) => (
              <TodoItem id={index} key={`todo_item_${index}`} todo={todo} meta={meta} />
            ))}
          </div>
          <NewTodo />
        </div>
      </div>
      <div className="absolute bottom-5 right-5 max-md:hidden">
        <Logo />
      </div>
    </div>
  );
}

export default Todos;
