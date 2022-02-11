
import { ITodo, TodoModel} from './todo';
import { Route, Body, Get, Controller, Post, BodyProp, Put, Delete, SuccessResponse } from 'tsoa';
 
@Route('/todo')
export class TodoController extends Controller {
    @Get('/')
    public async getAll() : Promise<ITodo[]> {
        try {
            let items: any[] = await TodoModel.find({});
            items = items.map((item) => { return {id: item._id, description: item.description}});
            return items;
        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }
 
    @Post('/')
    public async create(@BodyProp('description') description: string): Promise<void> {
        const item = new TodoModel({description: description});
        await item.save();
    }
 
    @Put('/{id}')
    public async update(id: string, @BodyProp('description') description: string): Promise<void> {
        await TodoModel.findOneAndUpdate({_id: id}, {description: description});
    }
 
    @Delete('/{id}')
    public async remove(id: string): Promise<void> {
        await TodoModel.findByIdAndRemove(id);
    }
}



