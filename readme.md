# Performance data

## Before optimization

### Sorting a column

- Commit Duration: 3.8s
- Render Duration: 346ms.
- Interactions: User interactions that triggered the renders.
- Flame Graph:
  ![screenshot](./src/assets/image-1.png "Sorting column before optimization")
- Ranked Chart: Sorted list of components by render duration.
  ![screenshot](./src/assets/image-2.png "Sorting column before optimization")

### Searching a country

- Commit Duration: 3s
- Render Duration: 76ms.
- Interactions: User interactions that triggered the renders.
- Flame Graph:
  ![screenshot](./src/assets/image-3.png "Sorting column before optimization")
- Ranked Chart: Sorted list of components by render duration.
  ![screenshot](./src/assets/image-4.png "Sorting column before optimization")

### Selecting another year

- Commit Duration: 3.8s
- Render Duration: 347ms.
- Interactions: User interactions that triggered the renders.
- Flame Graph:
  ![screenshot](./src/assets/image-5.png "Sorting column before optimization")
- Ranked Chart: Sorted list of components by render duration.
  ![screenshot](./src/assets/image-6.png "Sorting column before optimization")

### Adding/removing columns

- Commit Duration: 1.4s
- Render Duration: 354ms.
- Interactions: User interactions that triggered the renders.
- Flame Graph:
  ![screenshot](./src/assets/image-7.png "Sorting column before optimization")
- Ranked Chart: Sorted list of components by render duration.
  ![screenshot](./src/assets/image-8.png "Sorting column before optimization")

## After optimization

### Sorting a column

- Commit Duration: 2.2s
- Render Duration: 364ms.
- Flame Graph:
  ![screenshot](./src/assets/image-1-1.png "Sorting column before optimization")
- Ranked Chart: Sorted list of components by render duration.
  ![screenshot](./src/assets/image-1-2.png "Sorting column before optimization")

### Searching a country

- Commit Duration: 2.3s
- Render Duration: 265ms.
- Flame Graph:
  ![screenshot](./src/assets/image-1-3.png "Sorting column before optimization")
- Ranked Chart: Sorted list of components by render duration.
  ![screenshot](./src/assets/image-1-4.png "Sorting column before optimization")

### Selecting another year

- Commit Duration: 3.8s
- Render Duration: 347ms.
- Flame Graph:
  ![screenshot](./src/assets/image-1-5.png "Sorting column before optimization")
- Ranked Chart: Sorted list of components by render duration.
  ![screenshot](./src/assets/image-1-6.png "Sorting column before optimization")

### Adding/removing columns

- Commit Duration: 1.4s
- Render Duration: 382ms.
- Flame Graph:
  ![screenshot](./src/assets/image-1-7.png "Sorting column before optimization")
- Ranked Chart: Sorted list of components by render duration.
  ![screenshot](./src/assets/image-1-8.png "Sorting column before optimization")
