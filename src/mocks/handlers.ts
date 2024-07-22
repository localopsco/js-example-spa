// src/mocks/handlers.js
import { delay, http, HttpResponse } from 'msw';
import { Todo } from '../types';

const tasks: Todo[] = [
  {
    id: 1,
    created_at: '2024-07-11T12:33:50.367Z',
    updated_at: '2024-07-11T12:33:50.367Z',
    title: 'Switch to opentofu',
    description: 'Migrate from hashicorp terraform to opentofu',
    is_completed: true,
    attachment_url: null,
  },
  {
    id: 2,
    created_at: '2024-07-11T12:33:50.367Z',
    updated_at: '2024-07-11T12:33:50.367Z',
    title: 'Create example apps',
    description: 'For Go/Ruby/Node',
    is_completed: false,
    attachment_url: 'https://www.hollywoodreporter.com/wp-content/uploads/2021/05/batman-copy.jpg',
  },
  {
    id: 3,
    created_at: '2024-07-11T12:34:14.360Z',
    updated_at: '2024-07-11T12:34:14.360Z',
    title: 'Switch to opentofu',
    description: 'Migrate from hashicorp terraform to opentofu',
    is_completed: false,
    attachment_url: null,
  },
  {
    id: 4,
    created_at: '2024-07-11T12:34:14.360Z',
    updated_at: '2024-07-11T12:34:14.360Z',
    title: 'Create example apps',
    description: 'For Go/Ruby/Node',
    is_completed: false,
    attachment_url: null,
  },
];

export const handlers = [
  http.get('/api/v1/meta', () => {
    return HttpResponse.json({
      framework: 'node',
      version: 'v1.1.1',
      stack: 'Django, Postgres, Redis, React.JS',
      cloud_dependencies: 'AWS S3',
      attachment_supported: true,
    });
  }),

  http.get('/api/v1/tasks', () => {
    return HttpResponse.json(tasks);
  }),

  http.patch('/api/v1/tasks/:id', async (req) => {
    const data = (await req.request.json()) as Partial<(typeof tasks)[number]>;
    const { id } = req.params;

    const taskToUpdate = tasks.find((task) => task.id === Number(id));

    if (!taskToUpdate) {
      return HttpResponse.json({}, { status: 404 });
    }

    if ('is_completed' in data) {
      taskToUpdate.is_completed = data.is_completed as boolean;
    }

    return HttpResponse.json(taskToUpdate);
  }),

  http.post('/api/v1/tasks/:id/attach', async (req) => {
    await delay(5000);
    const { id } = req.params;

    const taskToUpdate = tasks.find((task) => task.id === Number(id));

    if (!taskToUpdate) {
      return HttpResponse.json({}, { status: 404 });
    }
    return HttpResponse.json(taskToUpdate);
  }),
];
