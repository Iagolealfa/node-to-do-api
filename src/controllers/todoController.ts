import { Request, Response } from "express"
import { prisma } from "../libs/prisma"

export const all =  async (req : Request, res : Response)=>{
    const list = await prisma.todos.findMany()
    res.json({list})
}
export const add =  async(req : Request, res : Response)=>{
    if(req.body.title){
        let {title} = req.body
        const createTodo = await prisma.todos.create({
            data : {
            title,
            done: req.body.done ? true : false
        }})
        res.status(201).json({createTodo})
    }else {
        res.json({error : "Dados não enviados!"})
    }
}
export const update =  async(req : Request, res : Response)=>{
    let id = parseInt(req.params.id as string)
    let todo = await prisma.todos.findUnique({where : {id}})
    if(todo){
        if(req.body.title){
            todo.title = req.body.title
        }
        if(req.body.done){
            switch(req.body.done.toLowerCase()){
                case 'true':
                case '1':
                    todo.done = true
                    break
                case 'false':
                case '0':
                    todo.done = false
                    break    
            }
        }
        res.json({todo})
    }else{
        res.json({error: "Item não encontrado."})
    }
}
export const del =  async(req : Request, res : Response)=>{
    let id = parseInt(req.params.id as string)
    try{
        const delTodo = await prisma.todos.delete({where : {id}})
        res.json({delTodo})
    }catch(error){
        res.json({error: 'Item não encontrado.'})
    }
}