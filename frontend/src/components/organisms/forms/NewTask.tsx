import React from 'react';
import { useForm } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';

function NewTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      dueDate: '',
    },
  });

  const onSubmit = (data) => console.log('form data', data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <VStack spacing={4} align="stretch">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input {...register('name')} name="name" placeholder="Name" />
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            {...register('description')}
            name="description"
            placeholder="Description"
          />
          <FormLabel htmlFor="dueDate">Due Date</FormLabel>
          <Input
            {...register('dueDate')}
            name="dueDate"
            placeholder="Due Date"
            type="date"
          />
        </VStack>
      </FormControl>
    </form>
  );
}

export default NewTask;
