import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Task } from '../../../models/task.model'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  form = new FormGroup({
    id: new FormControl(''),
    taskName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    taskStatus: new FormControl()
  });



  tasks: Task[] = []

  user = this.utilsService.getLocalStorage('user');
  property = this.utilsService.getLocalStorage('property');

  loading: boolean = false;

  ionViewWillEnter() {
    this.getTasks();
  }

  constructor() { }

  onCheckboxChange(task: Task, event: any) {

    let path = `users/${this.user.uid}/properties/${this.property.id}/tasks`

    task.taskStatus = event.detail.checked;
    this.firebaseService.updateTask(task, path).then(() => {
      console.log('Task updated:', task);
    }).catch(error => {
      console.error('Error updating task:', error);
    });
  }
  ngOnInit() {

  }

  submit() {

    if (this.form.valid) {
      
      console.log(this.form.value);
      this.addTask();
      // this.form.reset();
      // this.form.controls['taskName'].setValue('');
      
    }
  }    

  async addTask() {

    let path = `users/${this.user.uid}/properties/${this.property.id}/tasks`

    const loading = await this.utilsService.loading();
    await loading.present();
    
    delete this.form.value.id;
    const taskData = {
      ...this.form.value,
      taskStatus: false // Asegurando que taskStatus es false
    };


    this.firebaseService.addDocument(path, taskData)
    .then(async resp => {
      this.utilsService.presentToast({
        message: 'Tarea agregada correctamente',
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon: 'checkmark-circle-outline'
      })

    }).catch(error => {
      console.log(error);
      this.utilsService.presentToast({
        message: error.message,
        duration: 1500,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      })
    }).finally(() =>{
      this.form.reset();
      loading.dismiss();
    }) 
  }

  getTasks() {
    let path = `users/${this.user.uid}/properties/${this.property.id}/tasks` 
    console.log(path) 

    this.loading = true;
    let sub =  this.firebaseService.getCollectionData(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c =>({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        })))
      ).subscribe({
        next: (resp: any) => {
          this.tasks = resp;
          console.log(resp);
          this.loading = false;
          sub.unsubscribe();
        }
      })
  }


}
