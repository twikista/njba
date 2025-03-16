'use client';

import React from 'react';
import { TextInput } from '@/components/inputs/TextInput';
import { motion } from 'framer-motion';
import TagsInput from '@/components/inputs/TagsInput';

export default function StepTwo() {
  return (
    <motion.div className='space-y-4'>
      <TextInput
        label='Article Title'
        name='title'
        placeholder='Enter article title'
      />
      <TagsInput
        name='keywords'
        label='Keywords'
        placeholder='Enter article keywords'
      />
      <TagsInput
        name='jelClassification'
        label='JEL classifications'
        placeholder='Enter JEL classifications'
      />
    </motion.div>
  );
}

// ['title', 'keywords', 'jelClassification']
