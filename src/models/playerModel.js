import HealthModel from "./healthModel.js";

export default class PlayerModel {
  constructor(x, y) {
    this.x = 400;
    this.y = 300;
    this.speed = 160;
    this.direction = "down"; // Default direction
    this.health = new HealthModel(this, 100); // Attach health to player
    this.attackDamage = 10;
    this.attackRange = 50; // Attack range in pixels
    this.attackCooldown = 1000; // 1 second cooldown
    this.lastAttackTime = 0;
    this.state = "idle";  // "idle", "moving", "attacking"
    this.isAttacking = false;
    this.view = null;
  }

  setView(view) {
    this.view = view
  }

  takeDamage(amount) {
    this.health.takeDamage(amount);
  }

  canAttack(target, currentTime) {
    if (currentTime - this.lastAttackTime < this.attackCooldown) return false;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    if (distance > this.attackRange) {
      this.attacking = false
    } else {
      return true
    }
  }

  attack(target, currentTime) {
      target.takeDamage(this.attackDamage);
      this.lastAttackTime = currentTime;
      this.state = "attacking";
      this.attacking = true;
      if (this.direction == "left" || this.direction == "right") {
        let direction = target.x < this.view.sprite.x ? "left" : "right";
        this.view.playAttackAnimation(direction); // Optional attack animation
      } else {
        let direction = target.y < this.view.sprite.y ? "up" : "down";
        this.view.playAttackAnimation(direction); // Optional attack animation
      }

  }

  heal(amount) {
    this.health.heal(amount);
  }

  move(direction) {
    this.direction = direction;

    if (direction === "left") this.x -= this.speed / 60;
    if (direction === "right") this.x += this.speed / 60;
    if (direction === "up") this.y -= this.speed / 60;
    if (direction === "down") this.y += this.speed / 60;


    if (!this.attacking) {
      this.view.playMoveAnimation(direction);
    }

    this.view.updatePosition();
  }

  stopMoving() {
    if (!this.attacking)
      this.view.playIdleAnimation(this.direction)
  }
}
