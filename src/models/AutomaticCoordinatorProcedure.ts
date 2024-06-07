import { CoordinatorProcedure } from "./CoordinatorProcedure";

class AutomaticCoordinatorProcedure extends CoordinatorProcedure {
  email?: string;
  template_html?: string;

  constructor(id?: string, email?: string, template_html?: string) {
    super(id);
    this.email = email;
    this.template_html = template_html;
  }
}

export default AutomaticCoordinatorProcedure;
