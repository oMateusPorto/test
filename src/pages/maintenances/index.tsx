import { useContext } from "react";
import TitlePage from "../../components/title-page";
import NavBar from "../../components/navbar";
import { MaintenanceContext } from "../../contexts/maintenanceContext"
import { MaintenanceContextType, IMaintenance } from "../../contexts/maintenanceContext";
import { StageContext, StageContextType } from "../../contexts/stageContext";
import { UserContext, UserContextType } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function UserMaintenance() {

  const { maintenances,
    saveMaintenance,
    deleteMaintenance,
    updateMaintenance,
    getMaintenance,
    maintenance,
    setMaintenance,
    initialMaintenance } = useContext(MaintenanceContext) as MaintenanceContextType

  const { openStage, newStage, stages } = useContext(StageContext) as StageContextType
  const { user } = useContext(UserContext) as UserContextType

  const navigate = useNavigate()

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

  // function handleCancelStageModal() {
  //   setMaintenance(initialMaintenance)
  //   togleShowMaintenanceModal()
  // }

  // function handleStageMaintenance(id: string) {
  //   const item = maintenances.filter(item => item.id === id)
  //   openStage(id)
  //   if (item[0].status) {
  //     togleShowMaintenanceModalComplete()
  //   } else if (stage.description === '') {
  //     togleShowMaintenanceModalDescription()
  //   } else {
  //     togleShowMaintenanceModal()
  //   }
  // }

  // function updateStatusMaintenance(id: string) {
  //   const item = maintenances.filter(item => item.id === id)
  //   const a = { ...item[0], status: true }
  //   updateMaintenance(a)
  // }

  function stageOfMaintenance(id: string) {
    getMaintenance(id)
    const item = stages.filter(item => item.maintenanceId === id)
    if (item.length === 0) {
      newStage(id)
    }
    openStage(id)
    navigate('/Stages')
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <TitlePage title="Lista de Manutenção" />
        <form className="row g-3">
          <div className="col-12">
            <label className="form-label mt-3">
              {maintenance.id ? "Edite a manutenção" : "Insira a descrição da manutenção"}
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={maintenance.description}
              onChange={(e) => setMaintenance({ ...maintenance, description: e.target.value })} />
          </div>
          <div className="col-12">
            {
              maintenance.id === '' ?
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={(e) => handleSaveMaintenance(e, maintenance)}>
                  Adicionar
                </button>
                :
                <>
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    onClick={(e) => handleSaveMaintenance(e, maintenance)}>
                    salvar
                  </button>
                  <button
                    type="submit"
                    className="ms-3 btn btn-outline-danger"
                    onClick={() => setMaintenance(initialMaintenance)} >
                    cancelar
                  </button>
                </>
            }
          </div>
        </form>
        <div className="mt-3">
          {maintenances.length !== 0 ?
            <>
              {maintenances.map((item) => (
                <div className="card mt-3 shadow-sm" key={item.id} >
                  <div className="d-flex card-header">
                    <div className=" me-auto">
                      <h6>{item.description}</h6>
                    </div>
                    <span>
                      <i
                        className="fa-solid fa-pencil"
                        style={{ cursor: 'pointer' }}
                        onClick={() => getMaintenance(item.id)}
                      ></i>
                      <i
                        className="fa-solid fa-trash ms-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => deleteMaintenance(item.id)}
                      ></i>
                    </span>
                  </div>
                  <div className="card-body">
                    <p>{` Data de cadastro: ${item.createdAt}`}</p>
                    <p>{` Status: ${item.status === true ? 'Manutenção finalizada' : 'Manutenção em execução'}`}</p>
                    <div className=" d-flex pt-2 m-0 border-top justify-content-end">
                      <div className='d-flex justify-content-end'>
                        <button
                          className='btn btn-sm btn-outline-primary'
                          onClick={() => stageOfMaintenance(item.id)}
                        >
                          Etapas
                        </button>
                      </div>
                    </div>
                  </div>
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
