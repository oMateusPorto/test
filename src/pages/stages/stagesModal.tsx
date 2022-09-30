import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { IStage, StageContext, StageContextType } from "../../contexts/stageContext";

export default function StagesModal(props:any) {
  
  const { stage, setStage, updateStages, updateStatusStage } = useContext(StageContext) as StageContextType

  function handleInput(e: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target
    setStage({...stage, value: {...stage.value, [name]: value}})
  }

  function handleFormStage (e: any, stage: IStage){
    e.preventDefault()
    updateStages(stage)
    props.togleShowMaintenanceModal()
  }

  function saveStageComplete (e: any, stage:IStage){
    e.preventDefault()
    props.updateStatusMaintenance(stage.maintenanceId)
    updateStatusStage(stage) 
    props.togleShowMaintenanceModal()
  }

  return (
    <div>
      <Modal show={props.showMaintenanceModal} onHide={props.handleCancelStageModal}>
        <Modal.Header closeButton>
          <Modal.Title>{stage.description}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6>Etapas de Manutenção</h6>
            <form className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Etapa 1 - Texto</label>
                <input type="text" className="form-control" name="text" id="text" value={stage.value.text} onChange={handleInput} disabled={false}/>
              </div>
              <div className="col-md-12">
                <label className="form-label">Etapa 2 - Número</label>
                <input type="number" className="form-control" name="number" id="number" value={stage.value.number} onChange={handleInput} disabled={false}/>
              </div>
              <div className="col-md-12">
                <label className="form-label">Etapa 3 - Arquivo</label>
                <input type="text" className="form-control" name="file" id="file" value={stage.value.file} onChange={handleInput} disabled={false}/>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          { stage.value.file ?
            <button type="submit" className="btn btn-success" disabled={false} onClick={(e) => {saveStageComplete(e, stage)}} >Finalizar</button>
            :
            <button type="submit" className="btn btn-success" disabled={false} onClick={(e) => handleFormStage(e, stage)} >Salvar</button>
          }
        </Modal.Footer>
      </Modal>
    </div>
  )
} 