import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const Alert: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const Form: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Template</DialogTitle>
          <DialogDescription>
            Save your current prompt as a reusable template.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Template Name
            </label>
            <input
              id="name"
              placeholder="Enter template name"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter template description"
              className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Template</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const Large: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Model Information</DialogTitle>
          <DialogDescription>
            Detailed information about the selected AI model.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Model Name</h4>
              <p className="text-sm text-muted-foreground">GPT-4</p>
            </div>
            <div>
              <h4 className="font-medium">Max Tokens</h4>
              <p className="text-sm text-muted-foreground">8,192</p>
            </div>
            <div>
              <h4 className="font-medium">Input Cost</h4>
              <p className="text-sm text-muted-foreground">$0.03 / 1K tokens</p>
            </div>
            <div>
              <h4 className="font-medium">Output Cost</h4>
              <p className="text-sm text-muted-foreground">$0.06 / 1K tokens</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">
              Most capable GPT model, excelling at complex reasoning and creative tasks.
              Best for applications requiring deep understanding and sophisticated responses.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Capabilities</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Complex reasoning and analysis</li>
              <li>• Creative writing and content generation</li>
              <li>• Code generation and debugging</li>
              <li>• Advanced problem solving</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Close</Button>
          <Button>Select Model</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

// Interactive story with state
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Interactive Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Interactive Example</DialogTitle>
            <DialogDescription>
              This dialog demonstrates interactive state management.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="interactive-name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="interactive-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {name && (
              <p className="text-sm text-muted-foreground">
                Hello, {name}! Nice to meet you.
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
};
