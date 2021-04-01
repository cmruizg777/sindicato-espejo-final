import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading$ = new Subject<Boolean>();
  constructor(
    private modalService: NgbModal,
  ) { }

  getLoadingObservable(){
    return this.loading$.asObservable();
  }

  setLoading(loading){
    this.loading$.next(loading);
  }

  openModalLoading(content){
    this.modalService.open(content, {
      backdropClass: 'custom-backdrop',
      windowClass: 'loading-modal',
      centered: true,
    });
  }
  closeModal(){
    this.modalService.dismissAll();
  }
  
}
