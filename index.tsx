Bun.serve({
    port: 8080,
    hostname: "localhost",
    fetch: handler
});

function handler(request: Request): Response {
    const url = new URL(request.url);
    return new Response('Not found', { status: 404 })
}
