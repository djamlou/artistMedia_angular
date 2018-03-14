import {Album} from '../entities/album';

export class Artist {
    
    public id:number;
    public name:string;
    public img:string;
    public genres:any[];
    public albums?:Album[];
}
