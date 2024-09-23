class Stack<T> {
  private items: T[] = [];

  // Add an element to the stack
  push(item: T): void {
    this.items.push(item);
  }

  // Remove and return the top element
  pop(): T | undefined {
    return this.items.pop();
  }

  // Look at the top element without removing it
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the stack
  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return this.items;
  }
}

export function asteroidCollision(asteroids: number[]): number[] {
  const newBelt = new Stack<number>();
  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];
    const rAsteroid = newBelt.peek();
    if (!rAsteroid) {
      newBelt.push(asteroid);
      continue;
    }
    // check direction
    if (Math.sign(asteroid) >= Math.sign(rAsteroid)) {
      newBelt.push(asteroid);
      continue;
    }
    // collision
    if (Math.abs(asteroid) > Math.abs(rAsteroid)) {
      newBelt.pop();
      i--;
      continue;
    }
    if (Math.abs(asteroid) < Math.abs(rAsteroid)) {
      continue;
    }

    if (Math.abs(asteroid) == Math.abs(rAsteroid)) {
      newBelt.pop();
    }
  }
  return newBelt.toArray();
}
