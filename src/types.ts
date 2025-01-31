export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  finishedAt: string;
}

export type Filter = "all" | "todo" | "done";