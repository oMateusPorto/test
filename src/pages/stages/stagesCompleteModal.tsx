import { useContext } from "react"
import { Modal } from "react-bootstrap"
import { StageContext, StageContextType } from "../../contexts/stageContext"

export default function StagesCompleteModal(props: any) {

    const { stage } = useContext(StageContext) as StageContextType

    return (
        <>
            <Modal show={props.showMaintenanceModalComplete} onHide={props.togleShowMaintenanceModalComplete}>
                <Modal.Header closeButton>
                    <Modal.Title>Etapas concluídas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group">
                        <li className="list-group-item">{`Descrição: ${stage.description}`}</li>
                        <li className="list-group-item">{`Status: ${stage.status ? 'Concluido' : 'Pendente'}`}</li>
                        <li className="list-group-item">{`Data de criação: ${stage.createdAt}`}</li>
                        <li className="list-group-item">{`Etapa de texto: ${stage.value.text}`}</li>
                        <li className="list-group-item">{`Etapa de número: ${stage.value.number}`}</li>
                        <li className="list-group-item">{`Download do arquivo: ${stage.value.file}`}</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}