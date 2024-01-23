import {renderToString} from "react-dom/server";
const server = Bun.serve({
    port: 8080,
    hostname: "localhost",
    fetch: handler
});

type Todo = {id: number, text: string};
const todos: Todo[] = [];

console.log(`Server is listening on http://${server.hostname}:${server.port}`)

async function handler(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '' || url.pathname === '/')
        return new Response(Bun.file("index.html"))

    if (url.pathname === '/todos' && request.method === 'POST') {
        const { todo } = await request.json();

        if (!todo?.length) return new Response('Invalid input', { status: 500 })
        todos.push({
            id: todos.length + 1,
            text: todo,
        })

        return new Response(renderToString(<TodoList todos={todos} />))
    }

    if (url.pathname === '/todos' && request.method === 'GET') {
        return new Response(renderToString(<TodoList todos={[]} />))
    }

    return new Response('Not found', { status: 404 })
}

function TodoList(props: { todos: Todo[] }) {
    return <ul>
        {
            props.todos.length
                ? props.todos.map(todo => <li key={todo.id}>{todo.text}</li>)
                : 'No items added'
        }
    </ul>
}
