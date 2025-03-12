const Projects = [
    {id: 1, title: "PRO 1"},
    {id: 2, title: "PRO 2"},
    {id: 3, title: "PRO 3"},
];

export const GET = () => {
    return Response.json(Projects);
}

export const POST = async (Req: Request) => {
    const { data } = await Req.json();
    Projects.push(data)
    return Response.json(Projects);
}