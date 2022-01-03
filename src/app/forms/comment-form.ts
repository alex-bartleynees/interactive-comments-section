import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

const formBuilder = new FormBuilder();
const getForm = () =>
  formBuilder.group({
    comment: [
      '',
      {
        validators: [Validators.required]
      }
    ]
  });

export class SaveSearchForm extends FormGroup {
  constructor() {
    super(getForm().controls);
  }

  get comment(): AbstractControl {
    return this.get('comment') as AbstractControl;
  }
}
