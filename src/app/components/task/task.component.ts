import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks
    );
  }

  delete(task: Task): void {
    swal.fire({
      title: "Alerta",
      text: `Seguro que desea eliminar la tarea "${task.description}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then( (result) => {
      if(result.value){
        this.taskService.delete(task.id).subscribe(
            () => {
            this.tasks = this.tasks.filter(cli => cli !== task)
            swal.fire(
              'Tarea Eliminada!',
              `Tarea ${task.description} eliminada.`,
              'success'
            )
          }
        )
      }
    });
  }

}
