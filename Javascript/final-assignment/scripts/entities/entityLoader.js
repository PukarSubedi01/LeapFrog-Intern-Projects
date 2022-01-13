import { loadMarco } from "./marcoEntity.js";
import { loadSoldiers } from "./soldiersEntity.js";
import { loadPrisoners } from "./prisonersEntity.js";
import { loadMachineGunBullet } from "./bullets/machineGun.js";
import { loadFireGunBullet } from "./bullets/fireGun.js";
import { loadElement } from "./elements.js";
import { loadHealth } from "./health.js";
import { loadTank } from "./tank.js";

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
    loadFireGunBullet().then(addEntityAs("fireGunBullet")),
    loadElement().then(addEntityAs("compensationElement")),
    loadTank().then(addEntityAs("tank")),
    loadHealth().then(addEntityAs("health")),
  ]).then(() => entityFactories);
}
