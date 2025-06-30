import { FormArray, FormGroup } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";


const selectStates = new Map<string, boolean>();

export const selectFN = {
  // detecta el cierre
  actualizarEstadoCierre(selectId: string, ngSelectInstance?: NgSelectComponent): void {
    selectStates.set(selectId, false);
    if (ngSelectInstance) {
      setTimeout(() => {
        ngSelectInstance.close();
      }, 10);
    }
  },
  
  // cerrar selector
  cerrarSelect(event: MouseEvent, ngSelectInstance: NgSelectComponent, selectId: string): void {
    const target = event.target as HTMLElement;

    const isNgInput = target.classList.contains('ng-select-custom');

    if (!selectStates.has(selectId)) {
      selectStates.set(selectId, false);
    }

    const isOpen = selectStates.get(selectId);

    if (!isNgInput) {
      if (isOpen) {
        ngSelectInstance.close();
        selectStates.set(selectId, false);
      } else {
        ngSelectInstance.open();
        selectStates.set(selectId, true);
      } 
    }
  },


  resetNgSelect(event: MouseEvent, formControlName: string, form: FormGroup): void {
    const target = event.target as HTMLElement;
    const isOption = target.closest('.ng-option');
  
    if (!isOption) {
      form.get(formControlName)?.setValue('');
    }
  },
  
  resetNgSelectArray(event: MouseEvent, formControlName: string, form: FormGroup, i: number, formArrayName: string): void {
    const target = event.target as HTMLElement;
    const isOption = target.closest('.ng-option');
  
    if (!isOption) {
      const formArray = form.get(formArrayName) as FormArray;
  
      if (formArray && formArray.at(i)) {
        const formGroup = formArray.at(i) as FormGroup;
        formGroup.get(formControlName)?.setValue('');
      }
    }
  },
}