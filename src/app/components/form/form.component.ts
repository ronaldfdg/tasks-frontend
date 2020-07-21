import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  task: Task = new Task();
  pending: boolean = true;

  constructor(private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.findTask()
  }

  setPending(): void {
    this.pending = (this.pending) ? false : true;
  }

  findTask(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if(id){
          this.taskService.getTask(id).subscribe(task => this.task = task)
        }
      }
    )
  }

  create(): void {
    this.taskService.create(this.task).subscribe(
      task => {
        this.router.navigate(['/tasks'])
        swal.fire('Nueva tarea', `Tarea "${task.description}" agregada!`, 'success');
      }
    )
  }

  update(): void{
    this.taskService.update(this.task)
      .subscribe( task => {
          this.router.navigate(['/tasks'])
          swal.fire('Tarea actualizada', `Tarea "${task.description}" modificada!`, 'success');
        }
      )
  }

}
