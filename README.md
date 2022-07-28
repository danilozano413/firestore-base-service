# Firebase Firestore Base Service

## Description

Base service and interface to manage the read/write to firebase firestore realtime database as item based

## Installation

Add package to your project

``` bash
npm i firestore-base-service
```

Extends your item interface from our base to preserve id property

``` typescript

import { ItemInterface } from 'firestore-base-service';

export interface YourItemInterface extends ItemInterface {
   // Your properties
}

```

Extends your item service from our base to get the functionally and add the item type string to manage on database

``` typescript

import { BaseService } from 'firestore-base-service';

@Injectable({
    providedIn: 'root'
})
export abstract class YourItemService<YourItemInterface> extends  BaseService {
    protected abstract readonly itemType: string = 'yourItem';  // better use an Enum with all items

    // your methods here
}

```

## Methods

// TODO
