import HealthModel from "./healthModel.js";

export default class PlayerModel {
  constructor(x, y, inventory) {
    this.x = x;
    this.y = y;
    this.speed = 160;
    this.direction = "down"; 
    this.inventory = inventory;
    this.health = new HealthModel(this, 100);
    this.attackDamage = 10;
    this.attackRange = 50;
    this.attackCooldown = 1000; // in ms
    this.lastAttackTime = 0;
    this.state = "idle";  
    this.isAttacking = false;
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  startMoving(velocityX, velocityY) {
    this.state = "moving";
    this.x += velocityX / 60;  // Adjusting for framerate (speed is per second)
    this.y += velocityY / 60;
    this.view.setVelocity(velocityX, velocityY);
    if (!this.isAttacking) {
      this.view.playMoveAnimation(this.direction);
    }
  }

  stopMoving() {
    if (this.state === "moving") {
      this.state = "idle";
      this.view.setVelocity(0, 0);
      if (!this.isAttacking) {
        this.view.playIdleAnimation(this.direction);
      }
    }
  }

  takeDamage(amount) {
    this.health.takeDamage(amount);
  }

  canAttack(target, delta) {
    console.log(delta, this.lastAttackTime)
    if (delta - this.lastAttackTime < this.attackCooldown) return false;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    return distance <= this.attackRange;
  }

  attack(target, delta) {
    if (!target.isDead && this.canAttack(target, delta)) {
      target.takeDamage(this.attackDamage);
      this.lastAttackTime = delta;
      this.state = "attacking";
      this.isAttacking = true;

      this.view.playAttackAnimation(this.direction);
      
      this.view.sprite.once("animationcomplete", () => {
        this.isAttacking = false;
        this.stopMoving();
      });

      if (!target.isDead && target.health.currentHealth <= this.attackDamage) {
        this.inventory.addItem("Soul", target.soulsValue);
      }
    }
  }
}
