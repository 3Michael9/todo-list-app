import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../task.model';

@Component({
  standalone: true,
  templateUrl: './task-list.component.html',
  imports: [CommonModule, FormsModule]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', isCompleted: false };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe(data => this.tasks = data);
  }

  addTask(): void {
    if (!this.newTask.title.trim()) return;
    this.taskService.add(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = { id: 0, title: '', isCompleted: false };
    });
  }

  updateTask(task: Task): void {
    this.taskService.update(task).subscribe();
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe(() => this.loadTasks());
  }
}

