
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Library, BookOpenCheck, Edit3, PlusCircle, Trash2, NotebookText, Sparkles, BarChart3, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const BOOKS_LS_KEY = 'spiritualBooks';
const READING_LOGS_LS_KEY = 'spiritualReadingLogs';

const unitTypeOptions = ["pages", "chapters", "verses"] as const;

const addBookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(150, "Title is too long."),
  author: z.string().max(100, "Author name is too long.").optional().default(''),
  totalUnits: z.coerce.number().int().positive("Total units must be a positive number.").optional(),
  unitType: z.enum(unitTypeOptions).optional(),
}).refine(data => (data.totalUnits && data.unitType) || (!data.totalUnits && !data.unitType), {
    message: "Unit type is required if total units are specified.",
    path: ["unitType"],
});

type AddBookFormValues = z.infer<typeof addBookSchema>;

const logReadingSchema = z.object({
  bookId: z.string().min(1, "Please select a book."),
  unitsRead: z.coerce.number().int().positive("Units read must be a positive number.").min(1, "Minimum 1 unit read."),
  reflection: z.string().max(1000, "Reflection is too long.").optional().default(''),
});

type LogReadingFormValues = z.infer<typeof logReadingSchema>;

interface Book {
  id: string;
  title: string;
  author: string;
  totalUnits?: number;
  unitType?: typeof unitTypeOptions[number];
  currentProgress: number; 
  addedAt: string;
}

interface ReadingLog {
  id: string;
  bookId: string;
  unitsRead: number;
  reflection: string;
  loggedAt: string;
}

export default function SpiritualBookTrackerCalculator() {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingLogs, setReadingLogs] = useState<ReadingLog[]>([]);
  const [selectedBookForLog, setSelectedBookForLog] = useState<Book | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedBooks = localStorage.getItem(BOOKS_LS_KEY);
    if (storedBooks) {
      try { setBooks(JSON.parse(storedBooks)); } 
      catch (e) { console.error("Error parsing books from LS", e); localStorage.removeItem(BOOKS_LS_KEY); }
    }
    const storedLogs = localStorage.getItem(READING_LOGS_LS_KEY);
    if (storedLogs) {
      try { setReadingLogs(JSON.parse(storedLogs)); }
      catch (e) { console.error("Error parsing logs from LS", e); localStorage.removeItem(READING_LOGS_LS_KEY); }
    }
  }, []);

  useEffect(() => { localStorage.setItem(BOOKS_LS_KEY, JSON.stringify(books)); }, [books]);
  useEffect(() => { localStorage.setItem(READING_LOGS_LS_KEY, JSON.stringify(readingLogs)); }, [readingLogs]);

  const addBookForm = useForm<AddBookFormValues>({
    resolver: zodResolver(addBookSchema),
    defaultValues: { title: '', author: '', totalUnits: undefined, unitType: undefined },
  });

  const logReadingForm = useForm<LogReadingFormValues>({
    resolver: zodResolver(logReadingSchema),
    defaultValues: { bookId: '', unitsRead: undefined, reflection: '' },
  });

  const handleAddBook: SubmitHandler<AddBookFormValues> = (data) => {
    const newBook: Book = {
      id: new Date().toISOString() + data.title.slice(0,5),
      currentProgress: 0,
      addedAt: new Date().toISOString(),
      ...data,
    };
    setBooks((prev) => [newBook, ...prev]);
    addBookForm.reset();
    trackCalculatorUsage('spiritual-book-tracker');
    toast({ title: "Book Added!", description: `"${data.title}" has been added to your tracker.` });
  };

  const handleLogReading: SubmitHandler<LogReadingFormValues> = (data) => {
    const newLog: ReadingLog = {
      id: new Date().toISOString() + data.bookId.slice(0,5),
      loggedAt: new Date().toISOString(),
      ...data,
    };
    setReadingLogs((prev) => [newLog, ...prev]);
    
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === data.bookId
          ? { ...book, currentProgress: book.currentProgress + data.unitsRead }
          : book
      )
    );
    logReadingForm.reset({ bookId: data.bookId, unitsRead: undefined, reflection: '' }); 
    trackCalculatorUsage('spiritual-book-tracker');
    toast({ title: "Reading Logged!", description: `Progress for "${selectedBookForLog?.title}" updated.` });
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks((prev) => prev.filter(b => b.id !== bookId));
    setReadingLogs((prev) => prev.filter(log => log.bookId !== bookId)); 
    if (selectedBookForLog?.id === bookId) setSelectedBookForLog(null);
    toast({ title: "Book Removed", description: "The book and its logs have been deleted." });
  };

  const handleDeleteLog = (logId: string) => {
    const logToDelete = readingLogs.find(log => log.id === logId);
    if(logToDelete){
        setReadingLogs((prev) => prev.filter(l => l.id !== logId));
        setBooks((prevBooks) => 
            prevBooks.map(book => 
                book.id === logToDelete.bookId 
                ? {...book, currentProgress: Math.max(0, book.currentProgress - logToDelete.unitsRead)}
                : book
            )
        );
        toast({ title: "Log Entry Deleted", description: "The reading log entry has been removed." });
    }
  };

  const bookLogs = selectedBookForLog ? readingLogs.filter(log => log.bookId === selectedBookForLog.id) : [];

  return (
    <div className="space-y-8">
      <Form {...addBookForm}>
        <form onSubmit={addBookForm.handleSubmit(handleAddBook)} className="space-y-4">
          <Card className="shadow-sm border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center"><BookOpenCheck className="mr-2 h-5 w-5 text-accent" /> Add New Spiritual Text</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={addBookForm.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input placeholder="e.g., Bhagavad Gita" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={addBookForm.control} name="author" render={({ field }) => (
                <FormItem>
                  <FormLabel>Author/Origin (Optional)</FormLabel>
                  <FormControl><Input placeholder="e.g., Vyasa, Upanishads" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={addBookForm.control} name="totalUnits" render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Units (Optional)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 700 (if verses)" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={addBookForm.control} name="unitType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Type (if total specified)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select unit type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {unitTypeOptions.map(opt => <SelectItem key={opt} value={opt} className="capitalize">{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Book to Tracker
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card className="shadow-sm border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><Library className="mr-2 h-5 w-5 text-accent" /> Your Reading List</CardTitle>
        </CardHeader>
        <CardContent>
          {books.length === 0 ? (
            <p className="text-muted-foreground text-center py-3">No books added yet. Start by adding a text above.</p>
          ) : (
            <ScrollArea className="h-[250px] rounded-md border">
              <div className="p-2 space-y-2">
                {books.map(book => (
                  <Card key={book.id} className={`p-3 cursor-pointer hover:bg-muted/50 ${selectedBookForLog?.id === book.id ? 'bg-muted ring-2 ring-accent' : 'bg-card/70'}`} onClick={() => { setSelectedBookForLog(book); logReadingForm.setValue("bookId", book.id);}}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{book.title}</p>
                        <p className="text-xs text-muted-foreground">{book.author || 'N/A'}</p>
                        <p className="text-xs text-muted-foreground">
                          Progress: {book.currentProgress} {book.unitType || 'units'} read
                          {book.totalUnits && book.unitType ? ` / ${book.totalUnits} ${book.unitType} (${((book.currentProgress/book.totalUnits)*100).toFixed(0)}%)` : ''}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={(e) => {e.stopPropagation(); handleDeleteBook(book.id);}}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {selectedBookForLog && (
        <Form {...logReadingForm}>
          <form onSubmit={logReadingForm.handleSubmit(handleLogReading)} className="space-y-4">
            <Card className="shadow-sm border-accent">
              <CardHeader>
                <CardTitle className="text-lg flex items-center"><Edit3 className="mr-2 h-5 w-5 text-accent" /> Log Reading for: <span className="text-primary ml-1">{selectedBookForLog.title}</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <FormField control={logReadingForm.control} name="bookId" render={({ field }) => (<Input type="hidden" {...field} />)} />
                <FormField control={logReadingForm.control} name="unitsRead" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Units Read ({selectedBookForLog.unitType || 'units'})</FormLabel>
                    <FormControl><Input type="number" placeholder={`Number of ${selectedBookForLog.unitType || 'units'} read`} {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)}/></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={logReadingForm.control} name="reflection" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reflection/Notes (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="Your insights, key takeaways, or questions..." rows={3} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <NotebookText className="mr-2 h-4 w-4" /> Log Reading Session
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      )}
      
      {selectedBookForLog && (
        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-accent" /> Reading History for: <span className="text-primary ml-1">{selectedBookForLog.title}</span></CardTitle>
          </CardHeader>
          <CardContent>
            {bookLogs.length === 0 ? (
              <p className="text-muted-foreground text-center py-3">No reading logs yet for this book.</p>
            ) : (
              <ScrollArea className="h-[200px] rounded-md border">
                <div className="p-2 space-y-2">
                  {bookLogs.sort((a,b) => parseISO(b.loggedAt).getTime() - parseISO(a.loggedAt).getTime()).map(log => (
                    <Card key={log.id} className="p-2.5 text-xs bg-card/70 relative group">
                       <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium text-foreground">Read {log.unitsRead} {selectedBookForLog.unitType || 'units'}</p>
                                <p className="text-muted-foreground/80">{format(parseISO(log.loggedAt), "MMM d, yyyy h:mm a")}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/70 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100" onClick={() => handleDeleteLog(log.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      {log.reflection && <p className="mt-1 text-muted-foreground italic whitespace-pre-wrap border-t pt-1.5 text-[11px]">Reflection: {log.reflection}</p>}
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      )}
       {!selectedBookForLog && books.length > 0 && (
         <p className="text-center text-muted-foreground italic">Select a book from "Your Reading List" to log progress or view its history.</p>
       )}
    </div>
  );
}
