import { loadMarco } from "./marcoEntity.js";
import { loadSoldiers } from "./soldiersEntity.js";
import { loadPrisoners } from "./prisonersEntity.js";

export function loadEntities() {
  const entityFactories = {};
  function addEntityAs(name) {
    return (factory) => (entityFactories[name] = factory);
  }
  return Promise.all([
    loadMarco().then(addEntityAs("marco")),
    loadSoldiers().then(addEntityAs("soldiers")),
    loadPrisoners().then(addEntityAs("prisoners")),
  ]).then(() => entityFactories);
}
