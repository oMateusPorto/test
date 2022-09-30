import { useContext, useState } from "react";
import TitlePage from "../../components/title-page";
import StagesModal from "../stages/stagesModal";
import NavBar from "../../components/navbar";
import { MaintenanceContext } from "../../contexts/maintenanceContext"
import { MaintenanceContextType, IMaintenance } from "../../contexts/maintenanceContext";
import { StageContext, StageContextType } from "../../contexts/stageContext";
import StagesCompleteModal from "../stages/stagesCompleteModal";
import { UserContext, UserContextType } from "../../contexts/userContext";
import StageDescriptionModal from "../stages/stagesDescription";

export default function UserMaintenance() {

  const { maintenances,
    saveMaintenance,
    deleteMaintenance,
    updateMaintenance,
    getMaintenance,
    maintenance,
    setMaintenance,
    initialMaintenance } = useContext(MaintenanceContext) as MaintenanceContextType

  const { stage, openStage } = useContext(StageContext) as StageContextType
  const { user } = useContext(UserContext) as UserContextType

  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const togleShowMaintenanceModal = () => setShowMaintenanceModal(!showMaintenanceModal)

  const [showMaintenanceModalComplete, setShowMaintenanceModalComplete] = useState(false);
  const togleShowMaintenanceModalComplete = () => setShowMaintenanceModalComplete(!showMaintenanceModalComplete)

  const [showMaintenanceModalDescription, setShowMaintenanceModalDescription] = useState(false);
  const togleShowMaintenanceModalDescription = () => setShowMaintenanceModalDescription(!showMaintenanceModalDescription)

  const handleSaveMaintenance = (e: React.FormEvent, maintenance: IMaintenance | any) => {
    e.preventDefault()
    if (maintenance.id !== '') {
      updateMaintenance(maintenance)
    } else if (maintenance.description === '') {
      alert('Obrigatorio inserir a descrição da manutenção')
    } else {
      saveMaintenance(maintenance, user.id)
    }
    setMaintenance(initialMaintenance)
  }

  const handleInput = (e: any) => {
    const { name, value } = e.target
    setMaintenance({ ...maintenance, [name]: value })
  }

  function handleCancelStageModal() {
    setMaintenance(initialMaintenance)
    togleShowMaintenanceModal()
  }

  function handleStageMaintenance(id: string) {
    const item = maintenances.filter(item => item.id === id)
    openStage(id)
    if (item[0].status) {
      togleShowMaintenanceModalComplete()
    } else if (stage.description === '') {
      togleShowMaintenanceModalDescription()
    } else {
      togleShowMaintenanceModal()
    }
  }

  function updateStatusMaintenance(id: string) {
    const item = maintenances.filter(item => item.id === id)
    const a = { ...item[0], status: true }
    updateMaintenance(a)
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <TitlePage title="Lista de Manutenção" />
        <form className="row g-3">
          <div className="col-12">
            <label className="form-label mt-3">{maintenance.id ? "Edite a manutenção" : "Insira a descrição da manutenção"}</label>
            <input type="text" className="form-control" name="description" id="description" value={maintenance.description} onChange={handleInput} />
          </div>
          <div className="col-12">
            {
              maintenance.id === '' ?
                <button type="submit" className="btn btn-outline-success" onClick={(e) => handleSaveMaintenance(e, maintenance)}>Adicionar</button>
                :
                <>
                  <button type="submit" className="btn btn-outline-success" onClick={(e) => handleSaveMaintenance(e, maintenance)}>salvar</button>
                  <button type="submit" className="ms-3 btn btn-outline-danger" onClick={() => setMaintenance(initialMaintenance)} >cancelar</button>
                </>
            }
          </div>
        </form>
        <div className="mt-3">
          {maintenances.length !== 0 ?
            <>
              {maintenances.map((item) => (
                <div className="card mt-3 shadow-sm" key={item.id} >
                  <div className="card-header d-flex justify-content-between" style={{ cursor: 'pointer' }} onClick={() => handleStageMaintenance(item.id)}>
                    <h6 >{item.description}</h6>
                  </div>
                  <div className="card-body">
                    <p>{` Data de cadastro: ${item.createdAt}`}</p>
                    <p>{` Status: ${item.status === true ? 'Concluido' : 'Pendente'}`}</p>
                    <div className='d-flex justify-content-end pt-2 m-0 border-top'>
                      <button className='btn btn-sm btn-outline-primary me-2' onClick={() => getMaintenance(item.id)}>
                        Editar
                      </button>
                      <button className='btn btn-sm btn-outline-danger' onClick={() => deleteMaintenance(item.id)} >
                        Deletar
                      </button>
                    </div>
                  </div>
                  <StagesModal
                    showMaintenanceModal={showMaintenanceModal}
                    handleCancelStageModal={handleCancelStageModal}
                    updateStatusMaintenance={updateStatusMaintenance}
                    togleShowMaintenanceModal={togleShowMaintenanceModal}
                  />
                  <StagesCompleteModal
                    showMaintenanceModalComplete={showMaintenanceModalComplete}
                    togleShowMaintenanceModalComplete={togleShowMaintenanceModalComplete}
                  />
                  <StageDescriptionModal
                    showMaintenanceModalDescription={showMaintenanceModalDescription}
                    togleShowMaintenanceModalDescription={togleShowMaintenanceModalDescription}
                  />
                </div>
              ))}
            </>
            :
            <h6 className="text-center">Não há manutenções cadastradas</h6>
          }
        </div>
      </div>
    </>
  );
}
