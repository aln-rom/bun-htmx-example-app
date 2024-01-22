import {renderToString} from "react-dom/server";
const server = Bun.serve({
    port: 8080,
    hostname: "localhost",
    fetch: handler
});

console.log(`Server is listening on http://${server.hostname}:${server.port}`)

function handler(request: Request): Response {
    const url = new URL(request.url);

    if (url.pathname === '' || url.pathname === '/')
        return new Response(Bun.file("index.html"))

    if (url.pathname === '/todos' && request.method === 'POST') {
        return new Response(renderToString(<TodoList todos={[]} />))
    }

    return new Response('Not found', { status: 404 })
}

function TodoList(props: { todos: {id: number, text: string} }) {
    return <ul>
        {
            props.todos.length
                ? props.todos.map(todo => <li key={todo.id}>{todo.text}</li>)
                : 'No items added'
        }
    </ul>
}
