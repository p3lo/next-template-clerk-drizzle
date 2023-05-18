'use client';

import React from 'react';
import { Button } from './ui/button';

function MigrateDbButton() {
  async function migrateDb() {
    const response = await fetch('/api/db/migration', { cache: 'no-cache' });

    console.log(response);
  }
  return <Button onClick={migrateDb}>Migrate db</Button>;
}

export default MigrateDbButton;
