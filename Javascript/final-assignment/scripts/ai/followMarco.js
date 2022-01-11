export default class FollowMarco {
  constructor(entities) {
    this.entities = entities;
  }
  follow(subject) {
    this.entities.forEach((candidate) => {
      if (subject === candidate) {
        return;
      }

      //follow function helps generate an ai
      subject.follow(candidate);
      candidate.follow(subject);
    });
  }
}
