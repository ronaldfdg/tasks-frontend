import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  tasks: Task[];
  pendingTasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks
        let pendingTasks: Task[] = [];
        for(let task of this.tasks){
          if(task.pending){
            pendingTasks.push(task);
          }
        }
        this.pendingTasks = pendingTasks;
      }
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
            this.pendingTasks = this.pendingTasks.filter(cli => cli !== task)
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
