import { Modal, Button, ComboBox, Row } from '@carbon/react';
import { TextInput } from '@carbon/react';
import { Heading } from '@carbon/react';
import { Section } from '@carbon/react';
import { Toggle } from '@carbon/react';
import { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';

import type { QuestionDTO, UserDTO } from '../../../../db';

import { BasicSelect } from '../../../../components';
import { isEmpty } from '../../../../utils';

import styles from '../../styles/UserLayout.module.css';

export interface QuestionsModalProps {
  user?: UserDTO;
  questions: QuestionDTO[];
  open: boolean;
  handleClose: (key: string) => void;
  onSubmit: (data: QuestionDTO) => void;
}

const QuestionsModal = ({
  user,
  questions,
  open,
  handleClose,
  onSubmit,
}: QuestionsModalProps) => {
  const defaultMode = isEmpty(questions) ? 'setup' : 'edit';
  const [mode, setMode] = useState<string>(defaultMode);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionDTO>();
  const [questionInput, setQuestionInput] = useState<string>('');

  const {
    watch,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<QuestionDTO>({
    defaultValues: selectedQuestion
  });


  const form = watch();

  useEffect(() => {
    if(defaultMode !== mode) setMode(defaultMode);
  }, []);

  if(mode === 'setup') {
    return (
      <Modal
        open={open}
        modalHeading='Set Up Custom Form Questions'
        modalLabel='Admin functions'
        size={'md'}
        primaryButtonText='Next'
        secondaryButtonText='Cancel'
        onRequestClose={() => handleClose('questionsModal')}
        onRequestSubmit={next}
      >
        <p>
          You can add custom questions that will be displayed to the user when they are filling out the form.
          <ul className='mt-4'>
            <li>
              - Decide which users can see the question by selecting the 'internal' or 'public' <strong>type</strong>.
            </li>
            <li>
              - Decide whether the question is required by toggling the <strong>required</strong> field.
            </li>
            <li>
              - Additionally, you can hide any question from your form by selecting the <strong>hidden</strong> field.
            </li>
          </ul>
          <div className='mt-4'>Click 'Next' to continue.</div>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      className={styles.questions_modal}
      modalHeading='Configure Form Questions'
      modalLabel='Admin functions'
      size={'md'}
      primaryButtonText='Submit'
      secondaryButtonText={mode === 'edit' ? 'Cancel' : 'Back'}
      onRequestSubmit={submitQuestion}
      onSecondarySubmit={() => mode === 'edit' ? handleClose('questionsModal') : setMode('setup')}
      onRequestClose={() => handleClose('questionsModal')}
      primaryButtonDisabled={isEmpty(selectedQuestion)}
      preventCloseOnClickOutside
    >
      <Row className={styles.select_question_wrapper}>
        <ComboBox 
          id='select-question-combo-box'
          className={styles.combo_box}
          items={[...questions]}
          itemToString={(item: QuestionDTO) => item?.text}
          titleText='Add or Select Form Question'
          placeholder={'Select or type a question'}
          value={selectedQuestion?.text ?? questionInput}
          onChange={selectQuestion}
          onInputChange={handleQuestionInput}
        />
        { selectedQuestion ? (
          <Button kind='tertiary' size='md' onClick={cancelNewQuestion}>
              Cancel
          </Button>
        ) : (
          <Button kind='primary' size='md' onClick={selectNewQuestion}>
              Add New Question
          </Button>
        )}
      </Row>
      <Row className={styles.question_form_wrapper}>
        { selectedQuestion && (
          <Section level={4}>
            <Heading className='mb-2' size='sm'>{`${mode.toUpperCase()} QUESTION`}</Heading>
            <TextInput
              id='question-text'
              className='mt-2'
              labelText='Question Text'
              defaultValue={selectedQuestion?.text}
              {...register('text', { required: true })}
              invalid={!!errors.text}
              invalidText={errors.text?.message}
            />
            <BasicSelect 
              id='question-type'
              className='mt-2'
              items={["internal", "public"]}
              labelText='Question Type'
              {...register('type', { required: true })}
              invalid={!!errors.type}
            />
            <Toggle
              id='question-required'
              className={`${styles.toggle}`}
              aria-label='toggle question required'
              labelText='Required'
              defaultToggled={!!selectedQuestion?.required}
              {...register('required', { required: true })}
              onToggle={() => setValue('required', !form.required)}
              hideLabel
            />
            <Toggle
              id='question-hidden'
              className={`${styles.toggle}`}
              aria-label='toggle question hidden'
              labelText='Hidden'
              defaultToggled={!!selectedQuestion?.hidden}
              {...register('hidden', { required: true })}
              onToggle={() => setValue('hidden', !form.hidden)}
              hideLabel
            />
          </Section>
        )}
      </Row>
    </Modal>
  );

  function submitQuestion(e: any) {
    e.preventDefault();
    if(typeof onSubmit !== 'function') return;
    onSubmit({ ...form, organization_id: user?.organization_id } as QuestionDTO);
  }

  function selectQuestion({ selectedItem }: { selectedItem: QuestionDTO}) {
    setSelectedQuestion(selectedItem);
    reset(selectedItem);
    setMode('edit');
  }

  function selectNewQuestion() {
    setSelectedQuestion({ text: questionInput} as QuestionDTO);
    setValue('text', questionInput);
    setMode('add');
  }

  function cancelNewQuestion() {
    setSelectedQuestion(undefined);
    setQuestionInput('');
    reset();
  }

  function handleQuestionInput(input: string) {
    if(isEmpty(selectedQuestion?.text) && isEmpty(input)) return;

    setQuestionInput(input);
  }

  function next() {
    setMode('add');
  }
};

export { QuestionsModal };