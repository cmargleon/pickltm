import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { Technology } from './shared/models/technology';
import { Position } from './shared/models/position';
import { CategoriesService } from './shared/services/categories.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { trigger, style, transition, animate } from '@angular/animations';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {
  title = 'pickLatam';

  faPlus = faPlus;

  selectedTechnologies = [];

  stepIndex!: number;

  firstStep: boolean = true;

  lastStep: boolean = false;

  showSave: boolean = false;

  selectPositionError: boolean = false;

  selectTechError: boolean = false;

  technologiesFullList = new Array<Technology>();

  technologies: Technology[] = [{ name: "HTML", icon: "../assets/techLogos/html.svg", selected: false },
  { name: "CSS", icon: "../assets/techLogos/css.svg", selected: false },
  { name: "Javascript", icon: "../assets/techLogos/javascript.svg", selected: false },
  { name: "Angular", icon: "../assets/techLogos/angular.svg", selected: false }, {
    name: "React", icon: "../assets/techLogos/react.svg", selected: false
  },
  { name: "NodeJS", icon: "../assets/techLogos/nodejs.svg", selected: false }, {
    name: "Python", icon: "../assets/techLogos/python.svg", selected: false
  }, {
    name: "C#", icon: "../assets/techLogos/csharp.svg", selected: false
  }, {
    name: "Java", icon: "../assets/techLogos/java.svg", selected: false
  },
  { name: "Spring Framework", icon: "../assets/techLogos/spring.svg", selected: false }, {
    name: "Go", icon: "../assets/techLogos/go.svg", selected: false
  },
  {
    name: "Android", icon: "../assets/techLogos/android.svg", selected: false
  }, {
    name: "Blockchain", icon: "../assets/techLogos/blockchain.svg", selected: false
  },
  {
    name: "DevOps", icon: "../assets/techLogos/devops.svg", selected: false
  },
  {
    name: "Machine Learning", icon: "../assets/techLogos/machine.svg", selected: false
  },
  {
    name: "Data Engineer", icon: "../assets/techLogos/data.svg", selected: false
  },
  {
    name: "MongoDB", icon: "../assets/techLogos/mongodb.svg", selected: false
  },
  {
    name: "I need Advice", icon: "../assets/techLogos/question.svg", selected: false
  },
  ]

  positions: Position[] = [{ name: "Developer", icon: "../assets/positionIcons/developer.svg", selected: false },
  { name: "Project Manager", icon: "../assets/positionIcons/manager.svg", selected: false },
  { name: "UI/UX Specialist", icon: "../assets/positionIcons/uiux.png", selected: false },
  { name: "Team", icon: "../assets/positionIcons/development-team.svg", selected: false },
  {
    name: "I need Advice", icon: "../assets/techLogos/question.svg", selected: false
  },]

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      showPreviousButton: false,
      showNextButton: false
    }
  };

  firstForm!: FormGroup;

  constructor(private ngWizardService: NgWizardService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.categoriesService.getTechnologies().subscribe((res) => {
      let techList = res.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
      this.technologiesFullList = techList
    });
    this.firstForm = this.fb.group({
      jobPositions: this.fb.array([], [Validators.required]),
      mainTechs: this.fb.array([]),
    });
    this.secondForm = this.fb.group({
      workDay: [this.selectedWorkDay, [Validators.required]],
      companySize: [this.selectedCompanySize, [Validators.required]],
      availability: [this.selectedAvailability, [Validators.required]],
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(18)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.minLength(6), Validators.maxLength(13), Validators.pattern("^[0-9]*$")]],
      companyName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(18)]]
    })
  }

  //SECOND FORM

  get secondF() { return this.secondForm.controls; }

  secondForm!: FormGroup;

  selectedWorkDay = 'freelance'

  selectedCompanySize = '10';

  selectedAvailability = '10';

  secondFormSubmitted = false;

  selectSecondStep(value: any, section: string) {
    if (section == 'workday') {
      this.selectedWorkDay = value;
      this.secondForm.get('workDay')?.setValue(value);
      console.log(this.selectedWorkDay);

    } else if (section == 'companySize') {
      this.selectedCompanySize = value;
      this.secondForm.get('companySize')?.setValue(value);
    } else if (section == 'availability') {
      this.selectedAvailability = value;
      this.secondForm.get('availability')?.setValue(value);
    }
    console.log(this.selectedCompanySize);
    console.log(this.secondForm.value);
  }

  onSubmitSecondForm() {
    this.secondFormSubmitted = true;

    // stop here if form is invalid
    if (this.secondForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.secondForm.value, null, 4));
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.firstForm.get('jobPositions') as FormArray;

    if (e.target.checked) {

      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  checkSkill(selected: number, section: string) {
    if (section == "tech") {
      this.technologies[selected].selected = !this.technologies[selected].selected;
      const techArray: FormArray = this.firstForm.get('mainTechs') as FormArray;
      if (this.technologies[selected].selected) {
        techArray.push(new FormControl(this.technologies[selected].name));
      } else {
        let i: number = 0;
        techArray.controls.forEach((item) => {
          if (item.value == this.technologies[selected].name) {
            techArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    } else if (section == "position") {
      this.positions[selected].selected = !this.positions[selected].selected;
      const checkArray: FormArray = this.firstForm.get('jobPositions') as FormArray;
      if (this.positions[selected].selected) {
        checkArray.push(new FormControl(this.positions[selected].name));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item) => {
          if (item.value == this.positions[selected].name) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }

    }
  }


  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    if (this.firstStep) {
      const mainTechArray: Array<any> = this.firstForm.get('mainTechs')?.value;
      const selectedTechs: Array<any> = mainTechArray.concat(this.selectedTechnologies);

      if (this.firstForm.get("jobPositions")?.valid && selectedTechs.length > 0) {
        this.selectPositionError = false;
        this.ngWizardService.next();
      } else {
        if (!this.firstForm.get("jobPositions")?.valid) {
          this.selectPositionError = true;

        } else {
          this.selectPositionError = false;
        }
        if (selectedTechs.length == 0) {
          this.selectTechError = true;

        } else {
          this.selectTechError = false;
        }
      }
    }

  }

  showNextStep2(formStep: string) {
    console.log("aaaa");

    if (formStep == 'first') {
      const mainTechArray: Array<any> = this.firstForm.get('mainTechs')?.value;
      const selectedTechs: Array<any> = mainTechArray.concat(this.selectedTechnologies);

      if (this.firstForm.get("jobPositions")?.valid && selectedTechs.length > 0) {
        this.selectPositionError = false;
        this.ngWizardService.next();
      } else {
        if (!this.firstForm.get("jobPositions")?.valid) {
          this.selectPositionError = true;

        } else {
          this.selectPositionError = false;
        }
        if (selectedTechs.length == 0) {
          this.selectTechError = true;

        } else {
          this.selectTechError = false;
        }
      }
    } else if (formStep == 'second') {
      this.secondFormSubmitted = true;
      console.log("aaa");

      // stop here if form is invalid
      if (this.secondForm.invalid) {
        return;
      }

      // display form values on success
      this.ngWizardService.next();
      console.log(this.secondForm.value);

      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.secondForm.value, null, 4));
    }

  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {

    this.stepIndex = args.step.index;
    if (this.stepIndex != 0) {
      this.firstStep = false;
    } else {
      this.firstStep = true;
    }
    this.ngWizardService.stepChanged()
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

  previousStep() {
    this.ngWizardService.previous()

  }



}
