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

    return new Response('Not found', { status: 404 })
}
