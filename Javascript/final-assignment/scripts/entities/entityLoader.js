import { loadMarco } from "./marcoEntity.js";
import { loadSoldiers } from "./soldiersEntity.js";
import { loadPrisoners } from "./prisonersEntity.js";
import { loadMachineGunBullet } from "./bulletsEntity.js";
import { loadElement } from "./elements.js";

export function loadEntities() {
  const entityFactories = {};
  function addEntityAs(name) {
    return (factory) => (entityFactories[name] = factory);
  }
  return Promise.all([
    loadMarco(entityFactories).then(addEntityAs("marco")),
    loadSoldiers().then(addEntityAs("soldiers")),
    loadPrisoners(entityFactories).then(addEntityAs("prisoners")),
    loadMachineGunBullet().then(addEntityAs("machineGunBullet")),
    loadElement().then(addEntityAs("compensationElement")),
  ]).then(() => entityFactories);
}
