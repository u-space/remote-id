import { CoordinatorProcedure } from "./CoordinatorProcedure";

class ManualCoordinatorProcedure extends CoordinatorProcedure {
  text_description?: string;
  procedure_url?: string;
  template_url?: string;

  constructor(
    id?: string,
    text_description?: string,
    procedure_url?: string,
    template_url?: string
  ) {
    super(id);
    this.text_description = text_description;
    this.procedure_url = procedure_url;
    this.template_url = template_url;
  }
}

export default ManualCoordinatorProcedure;
