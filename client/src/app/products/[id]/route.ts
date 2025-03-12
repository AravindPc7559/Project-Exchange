const Projects = [
    {id: 1, title: "PRO 1"},
    {id: 2, title: "PRO 2"},
    {id: 3, title: "PRO 3"},
];


export const GET = (req: Request, {params}: {params: {id: string}}) => {
    const project = Projects.find((project) => project.id === parseInt(params.id));
    return Response.json(project);
}

export const DELETE = (req: Request, {params}: {params: {id: string}}) => {
    const project = Projects.filter((project) => project.id !== parseInt(params.id));
    return Response.json(project);
}