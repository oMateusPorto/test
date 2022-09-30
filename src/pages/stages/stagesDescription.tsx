import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { IStage, StageContext, StageContextType } from "../../contexts/stageContext";

export default function StageDescriptionModal(props:any){

    const { stage, setStage, updateStages } = useContext(StageContext) as StageContextType

    const handleSubmit = (e: any, stage: IStage) => {
        e.preventDefault()
        if (stage.description === '') {
          alert('Digite um valor valido')
        } else {
            updateStages(stage)
            props.togleShowMaintenanceModalDescription()
        }
      }

    return(
        <Modal show={props.showMaintenanceModalDescription} onHide={props.togleShowMaintenanceModalDescription}>
        <Modal.Header closeButton>
          <Modal.Title>Nova etapa de manutenção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Insira a Descrição</label>
                <input type="text" className="form-control" name="text" id="text" value={stage.description} onChange={(e) => setStage({ ...stage, description: e.target.value })} />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <button type="submit" className="btn btn-outline-success" onClick={(e) => handleSubmit(e, stage)}>Salvar</button>
        </Modal.Footer>
      </Modal>
    )
} 