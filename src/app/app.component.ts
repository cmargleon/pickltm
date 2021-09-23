import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { Technology } from './shared/models/technology';
import { Position } from './shared/models/position';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from './shared/services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pickLatam';

  selectedTechnologies = [];

  stepIndex!: number;

  firstStep: boolean = true;

  lastStep: boolean = false;

  showSave: boolean = false;

  faUser = faUser;

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
  { name: "Development Team", icon: "../assets/positionIcons/development-team.svg", selected: false },
  { name: "Project Manager", icon: "../assets/positionIcons/manager.svg", selected: false },
  { name: "UI/UX Specialist", icon: "../assets/positionIcons/uiux.png", selected: false },
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

  constructor(private ngWizardService: NgWizardService,
    private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService.getTechnologies().subscribe((res) => {
      this.technologiesFullList = res;
    })
  }

  checkSkill(selected: number, section: string) {
    if (section == "tech") {
      this.technologies[selected].selected = !this.technologies[selected].selected;
      console.log(this.technologies[selected].selected);
    } else if (section == "position") {
      this.positions[selected].selected = !this.positions[selected].selected;
    }
  }



  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    // let ngStep = args.step.title;
    // switch (ngStep) {
    //   case 'NAME':
    //     this.firstStep = true;
    //     this.lastStep = false;
    //     this.showSave = false;
    //     break;
    //   default:
    //     this.firstStep = false;
    //     this.lastStep = false;
    //     this.showSave = true;
    //     break;
    this.stepIndex = args.step.index;
    console.log(this.stepIndex == 0);
    if (this.stepIndex != 0) {
      this.firstStep = false;
    } else {
      this.firstStep = true;
    }
    // this.showPreviousStep();
    this.ngWizardService.stepChanged()
    // if (this.stepIndex ==! 0) {
    //   this.firstStep = true
    // } else {
    //   this.firstStep = false
    // }

    // }
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
