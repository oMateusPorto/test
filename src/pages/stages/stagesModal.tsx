import { Modal } from "react-bootstrap";
import { useContext } from "react";
import { IStage, StageContext, StageContextType } from "../../contexts/stageContext";

export default function StagesModal(props: any) {

    const {
        setStage,
        stage,
        initialStage,
        updateStages,
    } = useContext(StageContext) as StageContextType

    function handleSaveModalStage(stage: IStage) {
        updateStages({ ...stage, status: true, createdAt: new Date().toLocaleDateString() })
        props.togleShowMaintenanceModal()
        setStage(initialStage)
    }

    function handleHideModal() {
        props.togleShowMaintenanceModal()
        setStage(initialStage)
    }

    function typeOfStage(number: Number) {
        switch (number) {
            case 1:
                return 'Etapa de texto'
            case 2:
                return 'Etapa de número'
            case 3:
                return 'Etapa de arquivo'
            default:
                return ''
        }
    }

    function typeOfInput(number: Number) {
        switch (number) {
            case 1:
                return 'text'
            case 2:
                return 'number'
            case 3:
                return 'file'
            default:
                return ''
        }
    }

    return (
        <Modal show={props.showMaintenanceModal} onHide={handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{typeOfStage(stage.type)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            value={stage.description}
                            onChange={(e) => setStage({ ...stage, description: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Valor</label>
                        <input
                            type={typeOfInput(stage.type)}
                            className="form-control"
                            value={stage.value}
                            onChange={(e) => setStage({ ...stage, value: e.target.value })} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={stage.description.length > 0 && stage.value ? false : true}
                    onClick={() => handleSaveModalStage(stage)}
                >
                    Salvar
                </button>
            </Modal.Footer>
        </Modal>
    )

}