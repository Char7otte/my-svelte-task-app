import { deleteTask, patchTask } from "$lib/server/database/tasks.js";

export async function PATCH({params, request}) {
    const id = params.slug;
    const data = await request.json();
    console.log(data);

    // await patchTask()

    return new Response(JSON.stringify({success: true}), {
        status: 200,
        headers : {"Content-Type":"application/json"}
    })
}

export async function DELETE({params}) {
    const id = params.slug;
    await deleteTask(id);

    return new Response(JSON.stringify({success: true}), {
        status: 200,
        headers: {"Content-Type":"application/json"}
    })
}