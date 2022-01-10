import { loadMarco } from "./marcoEntity.js";
import { loadSoldiers } from "./soldiersEntity.js";
import { loadPrisoners } from "./prisonersEntity.js";
import { loadMachineGunBullet } from "./bulletsEntity.js";

export function loadEntities() {
  const entityFactories = {};
  function addEntityAs(name) {
    return (factory) => (entityFactories[name] = factory);
  }
  return Promise.all([
    loadMarco(entityFactories).then(addEntityAs("marco")),
    loadSoldiers().then(addEntityAs("soldiers")),
    loadPrisoners().then(addEntityAs("prisoners")),
    loadMachineGunBullet().then(addEntityAs("machineGunBullet")),
  ]).then(() => entityFactories);
}
